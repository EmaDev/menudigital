import Table from "@/components/Table";
import CategoryManager from "./Categories";
import { Header } from "./Header";

//export const ClientWrapper = ({ items, categories }: { items: IItem[]; categories:ICategory[] }) => {
export const ClientWrapper = () => {
  /*const setItems = useItemStore((state) => state.setItems);
    const setCategories = useCategoryStore( (state) => state.setCategories);
  
    useEffect(() => {
      setItems(items);
    }, [items, setItems]);
  
    useEffect(() => {
      setCategories(categories)
    }, [categories, setCategories]);*/

  return (
    <>
      <Header />
      <CategoryManager />
      <Table />
    </>
  );
};
