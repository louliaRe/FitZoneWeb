import React from "react";
import { Flex, MantineProvider, Title } from "@mantine/core";
import { AppShell } from "@mantine/core";
import { AuthProvider } from "./AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainAdminP from "./interfaces/MainAdminP";
import Login from "./interfaces/Login";
import GymInterface from "./interfaces/GymInterface";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import Managerinterface from "./interfaces/ManagerInterface";
import ManageGyms from "./interfaces/ManageGyms";
import EmpTable from "./interfaces/EmpTable";
import Test from "./interfaces/Test";
import Nav from "./Components/Nav";
import EmpMainP from "./interfaces/Employee/EmpMainP";
import ManageCoaches from "./interfaces/Employee/ManageCoaches";
import ManagePosts from "./interfaces/Employee/ManagePosts";
import ManageStore from "./interfaces/Employee/ManageStore";
import AddCat from "./Components/Employee/AddCat";
import DisplayItem from "./interfaces/Employee/DisplayItems";
import AddItem from "./interfaces/Employee/AddItem";
import ClothesForm from "./Components/Forms/ClothesForm";
import MealsForm from "./Components/Forms/MealsForm";
import SupplementsForm from "./Components/Forms/SupplementsForm";
import Discount from "./Components/Employee/Discount";
import ManageCourse from "./interfaces/Employee/ManageCourse";
import ManageGymHall from "./interfaces/Employee/ManageGymHall";
import Header from "./Components/Header";
import Branches from "./interfaces/Branches";
import DiscountCarousel from "./Components/Employee/DiscountCarsouel";
import ProductsTable from "./Components/Employee/ProductsTable";
import ManageProduct from "./interfaces/Employee/ManageProducts";
import TrainingPlan from "./Components/Employee/TrainingPlan";
import ManageGym from "./interfaces/Employee/ManageGym";
import ClassesOffers from "./interfaces/Employee/ClassesOffers";
import StoreOffers from "./interfaces/Employee/StoreOffers";
import CatOffers from "./interfaces/Employee/CatOffers";
import CategoryOffersTable from "./Components/Employee/CategoryOffersTable";
import CatDiscount from "./Components/Employee/CatDiscount";
import ProductOffers from "./interfaces/Employee/ProductOffers";
import ProductDiscount from "./Components/Employee/ProductDiscount";
import ProductOffersTable from "./Components/Employee/ProductOffersTable";
import TrainingPlanPage from "./interfaces/Employee/TrainingPlanPage";
import RegistrationDiscount from "./Components/Employee/RegistratinDiscount";
import TrainingPlanDisplay from "./Components/Employee/TrainingPlanDisplay";
import VouchersInterface from "./interfaces/VouchersInterface";
import PointsInterface from "./interfaces/PointsInterface";
import Point from "./Components/Point";
import AddEmp from "./Components/AddEmp";
import StatisticsAdmin from "./StatisticsAdmin";
import WalletTable from './Components/Employee/WalletTable';


function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          dark: ["#211F1F", "#a1E533"],
        },
        globalStyles: (theme) => ({
          body: {
            backgroundColor: theme.colors.dark[0],
            color: theme.colors.dark[1],
          },
        }),
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Admin */}
            <Route path="/admin" element={<MainAdminP />} />
            <Route path="/GymInterface" element={<GymInterface />} />
            <Route path="/Vouchers" element={<VouchersInterface />} />
            <Route path="/Points" element={<Point />} />
            <Route path="/StatisticsAdmin" element={<StatisticsAdmin />} />

{/* StatisticsAdmin */}
            {/* Manager */}
            <Route path="/ManagerInterface" element={<Managerinterface />} />
            <Route path="/ManageGyms" element={<ManageGyms />} />
            <Route path="/ManagerEmpTable/:id" element={<EmpTable />} />
            <Route path="/Branches/:id" element={<Branches />} />

            {/* Employee */}
            <Route path="/EmpMainP" element={<EmpMainP />} />
            <Route path="/EmpWalletTable" element={<WalletTable />} />

            <Route path="/EmpManageCoaches" element={<ManageCoaches />} />
            <Route path="/EmpManagePosts" element={<ManagePosts />} />
            <Route path="/EmpManageStore" element={<ManageStore />} />
            <Route
              path="/EmpManageProducts/:categoryId/:branch_id"
              element={<ManageProduct />}
            />

            <Route path="/EmpManage-gym" element={<ManageGym />} />
            <Route path="/EmpManage-courses" element={<ManageCourse />} />
            {/* <Route path="/Empcourses-discount" element={<CoursesDiscountPage />} /> */}
            <Route path="/EmpDiscountCarousel" element={<DiscountCarousel />} />
            <Route path="/EmpClassesOffers" element={<ClassesOffers />} />
            <Route path="/EmpDiscount" element={<Discount />} />
            <Route path="/EmpCatDiscount" element={<CatDiscount />} />
            <Route
              path="/EmpCatOffersTable"
              element={<CategoryOffersTable />}
            />
            <Route path="/EmpCatOffers" element={<CatOffers />} />

            <Route path="/EmpProductOffers" element={<ProductOffers />} />
            <Route path="/EmpProductDiscount" element={<ProductDiscount />} />
            <Route
              path="/EmpProductOffersTable"
              element={<ProductOffersTable />}
            />

            <Route
              path="/EmpRegistrationDiscount"
              element={<RegistrationDiscount />}
            />

            <Route path="/EmpAddCategory" element={<AddCat />} />
            <Route path="/EmpDisplayItem" element={<DisplayItem />} />
            <Route path="/EmpAddItem" element={<AddItem />} />
            <Route path="/EmpClothesForm" element={<ClothesForm />} />
            <Route path="/EmpMealsForm" element={<MealsForm />} />
            <Route path="/EmpSupplementForm" element={<SupplementsForm />} />

            <Route path="/EmpTrainingPlanPage" element={<TrainingPlanPage />} />
            <Route path="/EmpTrainingPlan" element={<TrainingPlan />} />
            <Route
              path="/EmpTrainingPlanDisplay"
              element={<TrainingPlanDisplay />}
            />

            <Route path="/EmpStoreOffers" element={<StoreOffers />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
