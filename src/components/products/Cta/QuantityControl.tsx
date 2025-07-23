import Icon from "@/components/shared/icons";
import { use, useState } from "react";

const ACCEPTED_KEY = ["Backspace", "ArrowLeft", "ArrowRight"];

const QuantityControl = ({
	onChangeQuantity,
	quantity,
	showControl = true,
}: {
	onChangeQuantity: (value: any) => void;
	quantity: number;
	showControl?: boolean;
}) => {
	const [resetInputKey, setResetInputKey] = useState(-1);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!/^\d$/.test(e.key) && !ACCEPTED_KEY.includes(e.key)) {
			e.preventDefault();
			// onChangeQuantity(0);
		}
	};

	const onBlurInput = (e) => {
		if (!e.target.value) {
			setResetInputKey(quantity++);
			onChangeQuantity(1);
		}
	};

	if (!showControl)
		return (
			<input
				type="text"
				key={resetInputKey.toString()}
				defaultValue={quantity}
				placeholder={quantity?.toString()}
				onChange={(e) => onChangeQuantity(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				onBlur={onBlurInput}
				className="p-4 rounded w-14 text-center border border-muted"
			/>
		);

	return (
		<div className="flex items-center gap-2">
			<button
				aria-label="Decrease quantity"
				onClick={() => {
					onChangeQuantity(Math.max(1, --quantity));
					setResetInputKey(--quantity);
				}}
			>
				<Icon iconName="Minus" size={40} viewSize={40} />
			</button>

			<input
				type="text"
				key={resetInputKey.toString()}
				defaultValue={quantity}
				placeholder={quantity?.toString() || "1"}
				onChange={(e) => onChangeQuantity(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				onBlur={onBlurInput}
				className="w-14 h-10 text-center border border-[#8C8B9080] rounded"
			/>

			<button
				aria-label="Increase quantity"
				onClick={() => {
					onChangeQuantity(++quantity);
					setResetInputKey(++quantity);
				}}
			>
				<Icon iconName="Plus" size={40} viewSize={40} />
			</button>
		</div>
	);
};
export default QuantityControl;
