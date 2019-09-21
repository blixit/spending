<?php

namespace App\Services;

use App\Entity\Spending;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

class SpendingManager
{
    /** @var EntityManagerInterface $entityManager */
    private $entityManager;
    private $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Spending::class);
    }

    function create($body)
    {
        $amount = $body['price'] ?? null;
        $label = $body['name'] ?? null;
        $date = $body['date'] ?? null;
        $date = isset($date)
            ? \DateTime::createFromFormat('d/m/Y H:i:s', $date)
            : new \DateTime('now');

        if (!isset($amount)) {
            throw new Exception('The amount can\'t be null');
        }
        if (empty($label)) {
            throw new Exception('The label can\'t be empty');
        }

        $spending = new Spending();
        $spending->setDate($date);
        $spending->setLabel($label);
        $spending->setPrice($amount);

        $this->entityManager->persist($spending);
        $this->entityManager->flush();

        return $spending;
    }

    function all()
    {
        return $this->repository->findBy(array(), array('date' => 'DESC'));
    }

    function search(array $filters)
    {
        return $this->repository->search($filters);
    }

    function remove(array $body)
    {
        $id = $body['id'];
        $spenging = $this->entityManager->getReference(Spending::class, $id);
        $this->entityManager->remove($spenging);
        $this->entityManager->flush();
    }
}
