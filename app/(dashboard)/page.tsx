import { GetFormStats, GetForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <CreateFormBtn />
      <Suspense
        fallback={[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      >
        <FormCards />
      </Suspense>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total visits",
          helperText: "All time form visits",
          value: data?.visits.toLocaleString() || "",
          loading,
          className: "shadow-md shadow-blue-600",
          icon: <LuView className="text-blue-600" />,
        },
        {
          title: "Total submissions",
          helperText: "All time form submissions",
          value: data?.submissions.toLocaleString() || "",
          loading,
          className: "shadow-md shadow-yellow-600",
          icon: <FaWpforms className="text-yellow-600" />,
        },
        {
          title: "Submission rate",
          helperText: "Visits that result in form submission",
          value: data?.submissionRate.toLocaleString() + "%" || "",
          loading,
          className: "shadow-md shadow-green-600",
          icon: <HiCursorClick className="text-green-600" />,
        },
        {
          title: "Bounce rate",
          helperText: "Visits that result in form interacting",
          value: data?.bounceRate.toLocaleString() + "%" || "",
          loading,
          className: "shadow-md shadow-red-600",
          icon: <TbArrowBounce className="text-red-600" />,
        },
      ].map((item, index) => (
        <StatsCard key={index} {...item} />
      ))}
    </div>
  );
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className=" text0sm font-medium  text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
          <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
        </div>
      </CardContent>
    </Card>
  );
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form}></FormCard>
      ))}
    </>
  );
}

function FormCardSkeleton() {
  return (
    <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" flex items-center gap-2 justify-between">
          <span className=" truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
      </CardHeader>
      <CardDescription>
        {formatDistance(form.createdAt, new Date(), {
          addSuffix: true,
        })}
      </CardDescription>
    </Card>
  );
}
