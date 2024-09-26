import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Nav.module.css";
import { FaPeopleGroup, FaStore } from "react-icons/fa6";
import {
  MdDiscount,
  MdMeetingRoom,
  MdOutlinePostAdd,
  MdOutlineSportsGymnastics,
} from "react-icons/md";
import { GrSchedulePlay, GrSchedules } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";

const data = [
  { link: "/EmpManageCoaches", label: "Coaches", icon: FaPeopleGroup },
  { link: "/EmpManagePosts", label: "Posts", icon: MdOutlinePostAdd },
  { link: "/EmpManageStore", label: "Store", icon: FaStore },
  { link: "/EmpManage-gym", label: "Halls", icon: MdMeetingRoom },
  {
    link: "/EmpManage-courses",
    label: "Course",
    icon: MdOutlineSportsGymnastics,
  },
  {
    link: "/EmpTrainingPlanPage",
    label: "standared plan",
    icon: AiOutlineSchedule,
  },
  {
    link: "/EmpDiscountCarousel",
    label: "Discounts",
    icon: MdDiscount,
  },
];

export default function Nav() {
  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon size={25} className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
