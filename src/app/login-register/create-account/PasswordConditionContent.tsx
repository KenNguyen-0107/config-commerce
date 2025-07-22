
const PasswordConditionContent = () => {
	return (
		<div className="flex flex-col gap-6 pt-10 lg:pt-0 lg:pl-20">
			<h2 className="text-blue uppercase">Password Requirements</h2>

			<ul className="font-lora flex flex-col gap-4 text-blue list-inside list-disc">
				<li>Password must be at least 8 characters long</li>
				<li>Password must include at least one number</li>
				<li>Password must include at least one lowercase character</li>
				<li>Password must include at least one uppercase character</li>
				<li>Password must include at least one non alphanumeric character</li>
			</ul>
		</div>
	);
};

export default PasswordConditionContent;