import Link from "next/link";
import Layout from "../components/layout/layout";
import { UserService } from "../services/user";

export default function DashBoard() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <Link href="/rooms/create">
        <a>Create Room</a>
      </Link>
    </Layout>
  )
}