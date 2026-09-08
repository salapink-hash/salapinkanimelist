import { authUserSession } from "@/libs/auth-libs";
import UserSettingsFlyout from "./UserSettingsFlyout";

export default async function UserActionButton() {
  const user = await authUserSession();

  return <UserSettingsFlyout user={user} />;
}
