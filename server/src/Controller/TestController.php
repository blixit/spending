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
            $carry += $item->getPrice();
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
        $spending = $spendingManager->create($body);
        $spending = $serializer->serialize($spending, 'json');

        return new JsonResponse([
          'data' => json_decode($spending, true)
        ]);
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
     * @Route("/test", name="test")
     */
    public function test(SpendingManager $spendingManager, SerializerInterface $serializer)
    {
        $data = $spendingManager->all();
        $spendings = $serializer->serialize($data, 'json');

        return new JsonResponse([
          'data' => json_decode($spendings, true)
        ]);
    }
}
