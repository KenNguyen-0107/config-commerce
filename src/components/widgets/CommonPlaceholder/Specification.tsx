import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tab';
import { ProductSpecification } from "@/gql/graphql";
import { cn } from '@/lib/utils';

const PDPSpecification = ({data} : {data: ProductSpecification[]}) => {
	if (!data.length) return null;

	return (
		<Tabs defaultValue={data[0].Id || ""}>
			<TabsList>
				{data.map((item) => 
					<TabsTrigger key={item.Id} value={item.Id || ""}>
						{item.NameDisplay}
					</TabsTrigger> )
				}
			</TabsList>

			{data.map((item) =>
				<TabsContent key={item.Id} value={item.Id || ""}>
					<div
						className={cn(
							"max-w-[720px] mx-auto space-y-2 px-4",
							"[&_h2]:text-blue [&_h2]:uppercase [&_h2]:!mb-10 [&_h2]:!mt-0",
							"[&_h3]:text-blue [&_h3]:uppercase",
							"[&_h4]:text-blue [&_h4]:uppercase",
							"[&_h5]:text-blue [&_h5]:uppercase",
							"[&_h6]:text-blue [&_h6]:uppercase",
							"[&_p]:font-lora [&>p]:text-muted",
							"[&_ul]:text-muted",
							"[&_li]:text-muted [&_li]:list-none [&_li]:before:content-['•'] [&_li]:before:text-yellow [&_li]:before:mr-2",
						)}
						dangerouslySetInnerHTML={{ __html: item.HtmlContent || "" }} />
				</TabsContent> )  
			}
		</Tabs>
	)
}

export default PDPSpecification;