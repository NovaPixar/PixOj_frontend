import ACCESS_ENUM from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = AccessEnum.NOT_LOGIN) => {
  //获取当前登录用户具有的权限(如果没有logionUser则表示未登录)
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户没有登录，那么就没有权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果不是管理员就没有权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
