import DashboardPostCreateEditor from "./editor";

export default function Page() {
  return (
    <>
      <div className="my-8">
        <p className="font-bold text-3xl">Create a new post</p>
        <p className="mt-2">
          Let's write something usefull and share with everyone around the
          world!
        </p>
        <div className="mt-8">
          <DashboardPostCreateEditor />
        </div>
      </div>
    </>
  );
}
