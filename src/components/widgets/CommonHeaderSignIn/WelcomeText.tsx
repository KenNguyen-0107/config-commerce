import { UserInfo } from "@/store/authen-store";

const WelcomeText = ({userInfo}: {
	userInfo: UserInfo;
}) => {

	if (!!userInfo) {
		return (
			<div className="font-medium text-blue">
				HELLO {userInfo.userLabel || userInfo.userName || "Guest"}
			</div>
		);
	}

	return <div className="font-medium text-blue">SIGN IN</div>;
};

export default WelcomeText;
