import DashboardPostCreateEditor from "./editor";

export default function Page() {
  return (
    <>
      <div className="my-8">
        <p className="font-bold text-3xl">Create a new post</p>
        <div className="mt-8">
          <DashboardPostCreateEditor />
        </div>
      </div>
    </>
  );
}
