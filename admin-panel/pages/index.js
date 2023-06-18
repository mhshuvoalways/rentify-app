import SidebarHeader from "@/components/sidebar/Sidbar";
import Dashboard from "@/components/dashboard/Dashboard";

const index = () => {
  return (
    <SidebarHeader>
      <Dashboard />
    </SidebarHeader>
  );
};

export default index;
