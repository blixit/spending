<?php

namespace App\Repository;

use App\Entity\Spending;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Spending|null find($id, $lockMode = null, $lockVersion = null)
 * @method Spending|null findOneBy(array $criteria, array $orderBy = null)
 * @method Spending[]    findAll()
 * @method Spending[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpendingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Spending::class);
    }

    function search(array $filters) : array
    {
        $builder =  $this->createQueryBuilder('s');

        if (is_string($filters['name'])) {
            $name = $filters['name'];
            $builder = $builder
                ->where('s.label LIKE :name')
                ->setParameter('name', "%$name%");
        }

        if (is_numeric($filters['maxPrice'])) {
            $maxPrice = $filters['maxPrice'];
            $builder = $builder
                ->andWhere('s.price <= :price')
                ->setParameter('price', $maxPrice);
        }

        if (is_numeric($filters['minPrice'])) {
            $minPrice = $filters['minPrice'];
            $builder = $builder
                ->andWhere('s.price >= :price')
                ->setParameter('price', $minPrice);
        }

        $dateEnd = is_string($filters['dateEnd'])
            ? new \DateTime(date('d/m/Y H:i:s', strtotime($filters['dateEnd'])))
            : new \DateTime('now');
        $dateEnd->setTime(23, 59, 59, 0);

        $dateStart = is_string($filters['dateStart'])
            ? new \DateTime(date('d/m/Y H:i:s', strtotime($filters['dateStart'])))
            : $dateEnd->sub(new \DateInterval('P1M'));
        $dateStart->setTime(0, 0, 0, 0);

        $builder = $builder
            ->andWhere('s.date BETWEEN :dateStart and :dateEnd')
            ->setParameter('dateStart', $dateStart, \Doctrine\DBAL\Types\Type::DATETIME)
            ->setParameter('dateEnd', $dateEnd, \Doctrine\DBAL\Types\Type::DATETIME);

        return $builder
            ->orderBy('s.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    // /**
    //  * @return Spending[] Returns an array of Spending objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Spending
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
