import ComponentContainer from "@/components/container";
import ListPosts from "./list-posts";
import SearchBox from "./search-box";

export default function Page() {
  return (
    <>
      <ComponentContainer>
        <p className="text-3xl font-semibold my-8">
          Daftar postingan untuk Anda baca
        </p>
        <SearchBox />
        <ListPosts />
      </ComponentContainer>
    </>
  );
}
