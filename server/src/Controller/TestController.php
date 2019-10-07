<?php

namespace App\Controller;

use App\Entity\Spending;
use App\Services\SpendingManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TestController
{
    /**
     * @Route("/account/balance", name="balance")
     */
    public function balance(SpendingManager $spendingManager)
    {
        $spendings = $spendingManager->all();
        $balance = array_reduce($spendings, static function ($carry, Spending $item) {
            $carry += (float)$item->getPrice();
            return $carry;
        }, 0);
        return new JsonResponse([
          'data' => [
            'value' => $balance,
            'devise' => '€'
          ]
        ]);
    }

    /**
     * @Route("/spending/add", name="add")
     */
    public function add(Request $request, SpendingManager $spendingManager, SerializerInterface $serializer)
    {
        $body = json_decode($request->getContent(), true);
        try {
            $spending = $spendingManager->create($body);
            $spending = $serializer->serialize($spending, 'json');

            return new JsonResponse([
                'data' => json_decode($spending, true)
            ]);
        } catch (\Throwable $e) {
            return new JsonResponse([
              'message' => $e->getMEssage()
            ], 400);
        }
    }

    /**
     * @Route("/spending/search", name="search")
     */
    public function search(Request $request, SpendingManager $spendingManager, SerializerInterface $serializer)
    {
        $body = json_decode($request->getContent(), true);
        $spendings = $spendingManager->search($body);
        $spendings = $serializer->serialize($spendings, 'json');

        return new JsonResponse([
          'data' => json_decode($spendings, true),
          'search' =>  $body
        ]);
    }

    /**
     * @Route("/spending/delete", name="delete")
     */
    public function remove(Request $request, SpendingManager $spendingManager, SerializerInterface $serializer)
    {
        $body = json_decode($request->getContent(), true);
        $spendingManager->remove($body);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("/test", name="test")
     */
    public function test(Request $request, SpendingManager $spendingManager, SerializerInterface $serializer)
    {
        $body = json_decode($request->getContent(), true);
        if (! empty($body)) {
            $spendings = $spendingManager->search($body);
        } else {
            $spendings = $spendingManager->all();
        }

        $spendings = $serializer->serialize($spendings, 'json');

        return new JsonResponse([
          'data' => json_decode($spendings, true)
        ]);
    }
}
