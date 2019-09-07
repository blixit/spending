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
    const TEMPORAL_FUNCTIONS = [
        'Day' => 'CAST(s.date as DATE)',
        'Week' => "DATE_FORMAT(s.date, 'week %u')",
        'Month' => "DATE_FORMAT(s.date, '%Y-%m')",
        'Quarter' => '',
        'Semester' => '',
        'Year' => 'YEAR(s.date)'
    ];

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Spending::class);
    }

    function search(array $filters) : array
    {
        $filterName = $filters['name'] ?? null;
        $filterScale = $filters['timeScale'] ?? null;
        $filterMaxPrice = $filters['maxPrice'] ?? null;
        $filterMinPrice = $filters['minPrice'] ?? null;
        $filterDateStart = $filters['dateStart'] ?? null;
        $filterDateEnd = $filters['dateEnd'] ?? null;

        $builder = $this->createQueryBuilder('s');

        $filterScaleActicated = $filterScale && isset(static::TEMPORAL_FUNCTIONS[$filterScale]);

        if ($filterScaleActicated) {
            $builder = $builder->select("
                SUM(s.price) as price,
                " . static::TEMPORAL_FUNCTIONS[$filterScale] . " as date,
                " . static::TEMPORAL_FUNCTIONS[$filterScale] . " as label
            ")
            ->groupBy('date')
            ;
        }

        if (is_string($filterName)) {
            $builder = $builder
                ->where('s.label LIKE :name')
                ->setParameter('name', "%$filterName%");
        }

        if (is_numeric($filterMaxPrice)) {
            $builder = $builder
                ->andWhere('s.price <= :price')
                ->setParameter('price', $filterMaxPrice);
        }

        if (is_numeric($filterMinPrice)) {
            $builder = $builder
                ->andWhere('s.price >= :price')
                ->setParameter('price', $filterMinPrice);
        }

        $dateEnd = !empty($filterDateEnd) && is_string($filterDateEnd)
            ? new \DateTime(date('d/m/Y H:i:s', strtotime($filterDateEnd)))
            : new \DateTime('now');
        $dateEnd->setTime(23, 59, 59, 0);

        $dateStart = !empty($filterDateStart) && is_string($filterDateStart)
            ? new \DateTime(date('d/m/Y H:i:s', strtotime($filterDateStart)))
            : $dateEnd->sub(new \DateInterval('P1M'));
        $dateStart->setTime(0, 0, 0, 0);

//        $builder = $builder
//            ->andWhere('s.date <> null AND s.date BETWEEN :dateStart and :dateEnd')
//            ->setParameter('dateStart', $dateStart, \Doctrine\DBAL\Types\Type::DATETIME)
//            ->setParameter('dateEnd', $dateEnd, \Doctrine\DBAL\Types\Type::DATETIME);

        if ($filterScaleActicated) {
            $builder->orderBy('date', 'DESC');
        } else {
            $builder->orderBy('s.date', 'DESC');
        }

        return $builder
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
