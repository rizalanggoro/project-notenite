import DashboardSidebar from "./sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <>
      <div className="px-4 max-w-[1024px] mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <DashboardSidebar />
        </div>
        <div className="col-span-9">{props.children}</div>
      </div>
    </>
  );
}
