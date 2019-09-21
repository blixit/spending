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
            ? \DateTime::createFromFormat('d/m/Y H:i:s', $filterDateEnd)
            : new \DateTime('now');
        $dateEnd->setTime(23, 59, 59, 0);

        $dateStart = null;
        if ($filterDateStart) {
            $dateStart = \DateTime::createFromFormat('d/m/Y H:i:s', $filterDateStart);
            $dateStart->setTime(0, 0, 0, 0);
        }


        if ($dateStart && $dateEnd) {
            $builder = $builder
                ->andWhere('s.date BETWEEN :dateStart and :dateEnd')
                ->setParameter('dateStart', $dateStart)
                ->setParameter('dateEnd', $dateEnd);
        } else if ($dateStart) {
            $builder = $builder
                ->andWhere('s.date >= :dateStart')
                ->setParameter('dateStart', $dateStart);
        } else if ($dateEnd) {
            $builder = $builder
                ->andWhere('s.date <= :dateEnd')
                ->setParameter('dateEnd', $dateEnd);
        }

        $builder = $builder->orderBy($filterScaleActicated ? 'date' : 's.date', 'DESC');

        return $builder
            ->getQuery()
            ->getResult();
    }
}
