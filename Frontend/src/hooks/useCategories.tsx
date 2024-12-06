import { useQuery } from '@tanstack/react-query';
import ProductApi from '../api/products.api';

const useCategories = () => {
  return useQuery({
    queryKey: ['/categories'],
    queryFn: () => {
      return ProductApi.getCategories()
    }
  });
};

export default useCategories;
