import { useQuery } from '@tanstack/react-query';
import ProductApi from '../api/products.api';
import { QueryConfig } from '../components/FlashSales/FlashSales';

const useProducts = ({ skip, limit, order, sortBy }: QueryConfig) => {
  const queryConfig: QueryConfig = {
    skip: skip,
    limit: limit,
    order: order,
    sortBy: sortBy
  };
  return useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => {
      return ProductApi.getProducts(queryConfig)
    }
  });
};

export default useProducts;
