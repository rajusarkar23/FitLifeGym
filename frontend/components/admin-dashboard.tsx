"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminStore } from "@/store/admin-store";
import { useEffect, useState } from "react";
import { AdminActionDropDown } from "./admin-action-dropdown";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

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

export function AdminDashboard({ authCookie }: { authCookie: string }) {
  const { fetchMembers } = useAdminStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSearchInputActive, setIsSearchInputActive] = useState(false);

  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState<Member[]>([]);

  useEffect(() => {
    const result = useAdminStore
      .getState()
      .members.filter((member) => member.email?.includes(searchData));
    setSearchResult(result);
  }, [searchData, useAdminStore.getState().members]);

  useEffect(() => {
    fetchMembers({ authCookie });
  }, []);

  if (useAdminStore.getState().members.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loader className="animate-spin ml-1" />
      </div>
    );
  }

  function PageNumber() {
    const pageNumber: number[] = [];
    const totalPage = Math.ceil(
      useAdminStore.getState().members.length / itemsPerPage
    );

    for (let i = 1; i <= totalPage; i++) {
      pageNumber.push(i);
    }

    return (
      <div className="space-x-2">
        {pageNumber.map((page) => (
          <Button
            onClick={() => {
              setCurrentPage(page);
            }}
            className={`${page === currentPage ? "bg-violet-700" : "bg-gray-300 text-black"}`}
          >
            {page}
          </Button>
        ))}
      </div>
    );
  }

  function getCurrentPageMembers() {
    const indexOfLastItem = currentPage * itemsPerPage; // 1 * 10 => 10
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 10 - 10 => 0
    const currentItems = useAdminStore
      .getState()
      .members.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems;
  }

  return (
    <div className="py-4 max-w-7xl mx-auto">
      <div className="max-w-96 mb-1">
        <Input
          placeholder="Global search: type here to search"
          onChange={(e) => {
            setIsSearchInputActive(true);
            const searchTerm = e.target.value;
            if (searchTerm.length === 0) {
              setIsSearchInputActive(false);
              return;
            }
            setSearchData(searchTerm);
          }}
        />
      </div>
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
          {useAdminStore.getState().members.length !== 0 &&
            !isSearchInputActive &&
            getCurrentPageMembers().map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.index}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell className="uppercase">
                  <Badge className="bg-purple-600 w-20 flex justify-center">
                    {member.selectedPlan}
                  </Badge>
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

          {/* if search active */}
          {isSearchInputActive &&
            searchResult.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.index}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell className="uppercase">
                  <Badge className="bg-purple-600 w-20 flex justify-center">
                    {member.selectedPlan}
                  </Badge>
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

      <div className="flex justify-center mt-2">
        <PageNumber />
      </div>
    </div>
  );
}
