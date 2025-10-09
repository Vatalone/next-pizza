import { Container, Filters, Stories, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({searchParams}: {searchParams: GetSearchParams}) {
  
  const categories = await findPizzas(searchParams);
  
  return (
    <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container>
    <TopBar categories={categories} />

    <Stories />
    
    <Container className="mt-10 pb-14">
      <div className="flex gap-[80px]">

        {/* Фильрация */}
        <div className="w-[250px]">
          <Suspense>
            <Filters />
          </Suspense>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category, idx) => (
                (category.products.length > 0 && <ProductsGroupList catedoryId={category.id} title={category.name} key={idx} items={category.products} />)
              ))}
              
            </div>
        </div>
      </div>
    </Container>
      
    </>
  );
}
