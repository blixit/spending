<?php

namespace App\Services;

use App\Entity\Spending;
use Doctrine\ORM\EntityManagerInterface;

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
        $spending = new Spending();
        $spending->setDate(new \DateTime('now'));
        $spending->setLabel($body['name'] ?? 'Unknow label');
        $spending->setPrice($body['price'] ?? 'Unknow price');

        $this->entityManager->persist($spending);
        $this->entityManager->flush();

        return $spending;
    }

    function all()
    {
        return $this->repository->findBy(array(), array('id' => 'DESC'));
    }

    function search(array $filters)
    {
        return $this->repository->search($filters);
    }
}
