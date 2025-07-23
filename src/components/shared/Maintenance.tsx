/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function Maintenance() {
	return (
		<>
			<header className="header--container">
				<div className="header">
					<div className="bg-blue pl-10 pr-10 pt-2 pb-2 h-[40px]"></div>
					<nav className="pt-6 pb-6 pl-10 pr-10 border-b-[1px] border-gray-500 border-opacity-20">
						<div className="pos-relative justify-content-between align-items-center d-flex w-100 h-100">
							<div className="pos-absolute top-nav__logo d-flex justify-content-center align-items-center pos-md-static h-100">
								<div className="d-flex align-items-center h-100">
									<Link className="top-nav__logo-link" href="/">
										<img
											className="top-nav__logo-img"
											src="/images/logo.jpg"
											alt="electrolux_logo_sg.svg"
											width="300"
										/>
									</Link>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</header>

			<div className="maintenance container text-center">
				<div className="flex flex-col pl-4 pr-4 items-center justify-center pt-10 pb-10 md:pt-24 md:pb-24">
					<img src="/images/maintenance.svg" alt="Jacksons Fencing" width="355" height="36" />
					<h2 className="text-[40px] mt-[40px]">Site is under maintenance</h2>
					<div className="text-center flex flex-col items-center justify-center pt-6 max-w-[400px] mx-auto font-['Electrolux_Sans','Microsoft_YaHei','SimSun','Heiti_SC',Roboto,Arial,sans-serif] text-[14px]">
						<p className="font-normal text-[#666666] mb-6">Hi there,</p>
						<p className="font-normal text-[#666666] mb-6">
							Site Maintenance is planned for <strong>about 3 hours</strong>. The website will be
							down during this time.
						</p>
						<p className="font-normal text-[#666666] mb-6">
							Thank you for your patience, we&apos;ll be back online shortly!
						</p>
						<p className="font-normal text-[#666666]">The Jacksons Fencing Team</p>
					</div>
				</div>
			</div>

			<footer className="footer text--white">
				<div className="footer__copyright text--primary text--small">
					<div className="bg-blue h-[50px] "></div>
					<p className="px-[50px] md:px-[100px] py-[20px] text--small text-[#666]">
						Copyright 2020 Jacksons Fencing - All Rights Reserved.
					</p>
				</div>
			</footer>
		</>
	);
}
