"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAdminStore } from "@/store/admin-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { AdminActionDropDown } from "./admin-action-dropdown";

interface Member {
  index: number | null;
  memberId: number | null;
  name: string | null;
  email: string | null;
  selectedPlan: string | null;
  isActive: boolean;
  subscriptionStarted: string | null;
  subscriptionEnds: string | null;
}

export default function ChartOverView({ authCookie }: { authCookie: string }) {
  const { fetchMembers } = useAdminStore();
  const [isDataActive, setIsDataActive] = React.useState(false);
  const [activeDataForSelectedPlan, setActiveDataForSelectedPlan] =
    React.useState<Member[]>([]);
  const [planName, setPlanName] = React.useState("");

  React.useEffect(() => {
    const fetchMember = async () => {
      await fetchMembers({ authCookie });
    };
    fetchMember();
  }, []);
  const premium = useAdminStore
    .getState()
    .members.filter((member) => member.selectedPlan === "premium");
  const elite = useAdminStore
    .getState()
    .members.filter((member) => member.selectedPlan === "elite");
  const basic = useAdminStore
    .getState()
    .members.filter((member) => member.selectedPlan === "basic");

  const chartData = [
    {
      member: "Premium",
      memberCount: premium.length,
      fill: "var(--color-premium)",
    },
    { member: "Elite", memberCount: elite.length, fill: "var(--color-elite)" },
    { member: "Basic", memberCount: basic.length, fill: "var(--color-basic)" },
  ];

  const chartConfig = {
    Members: {
      label: "Members",
    },
    premium: {
      label: "Premium",
      color: "hsl(var(--chart-1))",
    },
    elite: {
      label: "Elite",
      color: "hsl(var(--chart-2))",
    },
    basic: {
      label: "Basic",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  // BAR CHART DATA AND CONFIG
  const chartDataN = [
    {
      member: "Premium",
      memberCount: premium.length * 49,
      fill: "var(--color-premium)",
    },
    {
      member: "Elite",
      memberCount: elite.length * 79,
      fill: "var(--color-elite)",
    },
    {
      member: "Basic",
      memberCount: basic.length * 29,
      fill: "var(--color-basic)",
    },
  ];

  const chartConfigN = {
    Members: {
      label: "Members",
    },
    premium: {
      label: "Premium",
      color: "hsl(var(--chart-1))",
    },
    elite: {
      label: "Elite",
      color: "hsl(var(--chart-2))",
    },
    basic: {
      label: "Basic",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  function ShowDataInTable() {
    return (
      <div>
        <h1 className="max-w-7xl mx-auto text-xl font-semibold">
          Showing data for{" "}
          <span className="text-orange-600 font-bold underline underline-offset-2">
            {planName}
          </span>{" "}
          plan
        </h1>
        <Table className="dark:bg-gray-900/80 max-w-7xl mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Selected plan</TableHead>
              <TableHead>Subscription Started</TableHead>
              <TableHead>Subscription Ends</TableHead>
              <TableHead>Plan Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeDataForSelectedPlan.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell className="uppercase">
                  {member.selectedPlan === "premium" && (
                    <Badge className="bg-violet-500 w-20 flex justify-center">
                      {member.selectedPlan}
                    </Badge>
                  )}
                  {member.selectedPlan === "elite" && (
                    <Badge className="bg-green-400 w-20 flex justify-center">
                      {member.selectedPlan}
                    </Badge>
                  )}
                  {member.selectedPlan === "basic" && (
                    <Badge className="bg-amber-500 w-20 flex justify-center">
                      {member.selectedPlan}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(member.subscriptionStarted!, "PPP")}
                </TableCell>
                <TableCell>{format(member.subscriptionEnds!, "PPP")}</TableCell>
                <TableCell>
                  {member.isActive ? (
                    <Badge className="bg-green-600">Active</Badge>
                  ) : (
                    <Badge className="bg-red-600">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <AdminActionDropDown
                    memberId={member.memberId!}
                    planStatus={member.isActive ? "Active" : "Inactive"}
                    authCookie={authCookie}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex-row flex flex-col justify-center items-center sm:space-x-10 sm:space-y-0 space-y-2 py-4">
        {/* PIE CHART */}
        <Card className="sm:w-[400px] w-[350px]">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>Members according to plans</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </CardHeader>
          <CardContent className="max-w-4xl mx-auto">
            <ChartContainer
              config={chartConfig}
              className="flex justify-center items-center"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="memberCount"
                  nameKey="member"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {premium.length + elite.length + basic.length}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Member
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center hover:cursor-pointer hover:underline underline-offset-2"
                onClick={() => {
                  setIsDataActive(true);
                  setPlanName("Premium");
                  const data = useAdminStore
                    .getState()
                    .members.filter(
                      (member) => member.selectedPlan === "premium"
                    );
                  setActiveDataForSelectedPlan(data);
                }}
              >
                <div className="rounded-full bg-[hsl(var(--chart-1))] w-3 h-3 mr-2"></div>{" "}
                Premium: {premium.length}
              </div>
              <div
                className="flex items-center hover:cursor-pointer hover:underline underline-offset-2"
                onClick={() => {
                  setIsDataActive(true);
                  setPlanName("Elite");
                  const data = useAdminStore
                    .getState()
                    .members.filter(
                      (member) => member.selectedPlan === "elite"
                    );
                  setActiveDataForSelectedPlan(data);
                }}
              >
                <div className="rounded-full bg-[hsl(var(--chart-2))] w-3 h-3 mr-2"></div>{" "}
                Elite: {elite.length}
              </div>
              <div
                className="flex items-center hover:cursor-pointer hover:underline underline-offset-2"
                onClick={() => {
                  setIsDataActive(true);
                  setPlanName("Basic");
                  const data = useAdminStore
                    .getState()
                    .members.filter(
                      (member) => member.selectedPlan === "basic"
                    );
                  setActiveDataForSelectedPlan(data);
                }}
              >
                <div className="rounded-full bg-[hsl(var(--chart-3))] w-3 h-3 mr-2"></div>{" "}
                Basic: {basic.length}
              </div>
            </div>
          </CardFooter>
        </Card>
        {/* Rev CHART */}
        <Card className="sm:w-[400px] w-[350px]">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>Revenue according to plans</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigN}
              className="flex justify-center items-center"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataN}
                  dataKey="memberCount"
                  nameKey="member"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              $
                              {premium.length * 49 +
                                elite.length * 79 +
                                basic.length * 29}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total Revenue
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-[hsl(var(--chart-1))] w-3 h-3"></div>
              <p className="flex">
                Premium: <span>${premium.length * 49}</span>
              </p>
              <div className="rounded-full bg-[hsl(var(--chart-2))] w-3 h-3"></div>
              <p className="flex">

                Elite: <span>${elite.length * 79}</span>
              </p>
              <div className="rounded-full bg-[hsl(var(--chart-3))] w-3 h-3"></div>
              <p className="flex">
                Basic: <span>${basic.length * 29}</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>{isDataActive && <div>{<ShowDataInTable />}</div>}</div>
    </div>
  );
}
