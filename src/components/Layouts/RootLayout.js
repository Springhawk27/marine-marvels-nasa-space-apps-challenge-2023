import {
  GithubOutlined,
  LinkedinFilled,
  GoogleSquareFilled,
  TwitterSquareFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, Grid, Drawer } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const RootLayout = ({ children }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const gradientBackground = `
    linear-gradient(
      to right,
      rgb(6,30,102) 0%,
      rgb(2,6,65) 100%
    )
  `;

  const menuGradientBackground = `
    linear-gradient(
      to bottom,
      rgb(1,116,152) 0%,
      rgb(2,6,65) 100%
    )
  `;

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   backgroundColor: "#2B2B2B",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 23,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div>
          <Link
            href="/"
            style={{
              color: "white",
              padding: "0px 0px",
              borderRadius: "3px",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col relative ">
                <span className="text-2xl  absolute top-2">Marine</span>{" "}
                <span className="text-lg  absolute top-6 ">Marvels</span>
              </div>
              <Image
                className="text-lg  absolute left-32 top-5 "
                src="/images/nav_logo.png"
                width={48}
                height={24}
                alt="logo"
              ></Image>
            </div>
          </Link>
        </div>
        {screens.md ? (
          <div className={styles.menu_items}>
            <Link href="/">
              <items>
                <Space>Home</Space>
              </items>
            </Link>
            <Link href="/explore">
              <items>
                <Space>Explore</Space>
              </items>
            </Link>
            <Link href="/learn">
              <items>
                <Space>Learn</Space>
              </items>
            </Link>
            <Link href="/game">
              <items>
                <Space>Game</Space>
              </items>
            </Link>
            <Link href="/liveobservation">
              <items>
                <Space>Live Observation</Space>
              </items>
            </Link>

            {/* <Link href="/login">
              <Space>
                <items>Login</items>
              </Space>
            </Link> */}
          </div>
        ) : (
          <>
            <div>
              <Button
                className="text-white font-bold text-xl"
                type="text"
                onClick={showDrawer}
              >
                <MenuOutlined />{" "}
              </Button>
            </div>

            <Drawer
              title="Marine Marvels"
              width={250}
              closable={false}
              onClose={onClose}
              open={open}
              style={{
                background: menuGradientBackground,
              }}
            >
              <div className=" flex flex-col gap-y-4 font-bold">
                <Link href="/">
                  <items className="text-white">
                    <Space>Home</Space>
                  </items>
                </Link>
                <Link href="/explore">
                  <items className="text-white">
                    <Space>Explore</Space>
                  </items>
                </Link>
                <Link href="/learn">
                  <items className="text-white">
                    <Space>Learn</Space>
                  </items>
                </Link>
                <Link href="/game">
                  <items className="text-white">
                    <Space>Game</Space>
                  </items>
                </Link>
                <Link href="/liveobservation">
                  <items className="text-white">
                    <Space>Live Observation</Space>
                  </items>
                </Link>

                {/* <Link href="/login">
                  <Space>
                    <items className="text-white">Login</items>
                  </Space>
                </Link> */}
              </div>
            </Drawer>
          </>
        )}
      </Header>

      <Content
        // className="bg-blue-200 pt-16"
        // className=" pt-16"
        style={{
          //   padding: "0 0",
          minHeight: "100vh",
          //   minHeight: "calc(100vh - 120px)",
          //   minHeight: "calc(100vh + 64px)",
          position: "relative",
          //   backgroundColor: "#023567",
          //   background: gradientBackground,
        }}
      >
        {children}
      </Content>

      <div
        style={{
          //   background: gradientBackground,
          marginTop: "-60px",
          zIndex: 1,
        }}
      >
        <Footer
          className=" text-slate-300 bg-cover bg-center"
          style={{
            textAlign: "center",
            backgroundImage: `url('/images/waves.png')`,
            //   position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          {/* <h2
            style={{
              fontSize: "28px",
            }}
          >
            Marine Marvels
          </h2> */}
          <div className={styles.line}></div>
          Marine Marvels ©2023 Created by marine_marvels
        </Footer>
      </div>
    </Layout>
  );
};
export default RootLayout;
