import ComponentContainer from "@/components/container";
import ListPosts from "./list-posts";
import SearchBox from "./search-box";

export default function Page() {
  return (
    <>
      <ComponentContainer>
        <div className="my-8 space-y-2">
          <p className="text-3xl font-semibold">Daftar postingan</p>
          <p className="text-muted-foreground">
            Beberapa postingan yang dapat Anda baca untuk menambah wawasan dan
            pengetahuan
          </p>
        </div>

        <SearchBox />
        <ListPosts />
      </ComponentContainer>
    </>
  );
}
