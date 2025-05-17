"use client";

import * as React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";
import { useAdminStore } from "@/store/admin-store";

export function AdminActionDropDown({
  memberId,
  planStatus,
  authCookie
}: {
  memberId: number;
  planStatus: string;
  authCookie: string
}) {
  const [isDropdownOpen, setIsDropDownOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] =
    React.useState(false);
  const [isMemberStatusUpdating, setIsMemberStatusUpdating] = React.useState(false)
  const [isMemberStatusUpdateError, setIsMemberUpdateError] =
    React.useState(false);
  const [memberStatusUpdateErrorMessage, setMemberStatusUpdateErrorMessage] =
    React.useState("");
  const [changedMemberStatus, setChangedMemberStatus] = React.useState("");
  const [deletingMember, setDeletingMember] = React.useState(false)


  const { fetchMembers } = useAdminStore();
  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropDownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-center hover:cursor-pointer hover:shadow transition-all hover:bg-gray-200 ease-in-out hover:font-bold rounded"
          onSelect={(e) => {
            e.preventDefault();
            setIsDialogOpen(true);
          }}
        >
          Update status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-center hover:cursor-pointer hover:font-bold transition-all hover:bg-red-300 rounded"
          onSelect={(e) => {
            e.preventDefault();
            setIsDeleteAlertDialogOpen(true);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* CHANGE STATUS DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make changes in active status</DialogTitle>
            <DialogDescription>
              Make changes here here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Current status
              </Label>
              <Input
                id="name"
                defaultValue={planStatus}
                disabled={true}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Change status
              </Label>
              <Select
                onValueChange={(e) => {
                  setIsMemberUpdateError(false);
                  if (e === planStatus) {
                    setIsMemberUpdateError(true);
                    setMemberStatusUpdateErrorMessage(
                      `The member status is already ${e}.`
                    );
                    return;
                  }
                  setChangedMemberStatus(e);
                }}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Active or Deactive this member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Active">Activate</SelectItem>
                    <SelectItem value="Inactive">Deactivate</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center">
              {isMemberStatusUpdateError && (
                <p className="text-red-600 font-semibold text-sm">
                  {memberStatusUpdateErrorMessage}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isMemberStatusUpdateError || isMemberStatusUpdating}
              onClick={async () => {
                try {
                  setIsMemberStatusUpdating(true)
                  const sendReq = await fetch(
                    `${NEXT_PUBLIC_BACKEND_URL}/admin/update-member-status?status=${changedMemberStatus}&memberId=${memberId}`
                  ,{
                    method: "PUT"
                  });
                  const res = await sendReq.json();
                  if (res.success) {
                    fetchMembers({ authCookie });
                    setIsMemberStatusUpdating(false)
                    setIsDialogOpen(false);
                  } else {
                    setIsMemberUpdateError(true);
                    setMemberStatusUpdateErrorMessage(res.message);
                    setIsMemberStatusUpdating(false)
                  }
                } catch (error) {
                  console.log(error);
                  setIsMemberUpdateError(true);
                  setMemberStatusUpdateErrorMessage("Something got broken.");
                  setIsMemberStatusUpdating(false)
                }
              }}
            >
              {
                isMemberStatusUpdating ? (<Loader className="animate-spin"/>) : (<p>Save changes</p>)
            }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* DELETE ALERT DIALOG */}
      <AlertDialog
        open={isDeleteAlertDialogOpen}
        onOpenChange={setIsDeleteAlertDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              member's account and remove their data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            onClick={async () => {
              try {
                const sendReq = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/admin/delete-member?data=${memberId}`, {
                  method: "DELETE"
                })
                const res = await sendReq.json()

                if (res.success) {
                  fetchMembers({authCookie})
                  setIsDeleteAlertDialogOpen(false)
                  setIsDropDownOpen(false)
                } else{
                  console.log(res);
                  
                }
              } catch (error) {
                console.log(error);
                
              }
            }}
            >Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}
