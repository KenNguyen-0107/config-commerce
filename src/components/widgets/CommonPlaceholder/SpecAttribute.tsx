import { ProductAttributeType } from "@/gql/graphql";

const PDPSpecAttribute = ({ data }: { data: ProductAttributeType[] }) => {
	return (
		<div className="space-y-6 lg:space-y-12">
			<h2 className="text-blue uppercase">Technical Specifications</h2>

			{!!data.length && (
				<table>
					<tbody>
						{data.map((item, index) => (
							<tr key={index}>
								<td>
									<h5 className="uppercase text-blue pr-20 py-2">
										{item.Label || item.Name}
									</h5>
								</td>
								<td className="text-muted text-lg font-lora">
									{
										item.AttributeValueContainer?.AttributeValues?.[0]
											?.ValueDisplay
									}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PDPSpecAttribute;
