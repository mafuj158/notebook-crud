"use client";

import React from "react";
import { Modal } from "antd";

interface LogoutModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function LogoutModal({
  open,
  onCancel,
  onConfirm,
  loading = false,
}: LogoutModalProps) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 font-mono font-black text-base uppercase text-black">
          <div className="w-3 h-3 bg-[#fb7185] border border-black inline-block" />
          <span>Confirm Logout</span>
        </div>
      }
      open={open}
      onOk={onConfirm}
      onCancel={() => !loading && onCancel()}
      confirmLoading={loading}
      okText={loading ? "LOGGING OUT..." : "LOGOUT"}
      cancelText="CANCEL"
      centered
      okButtonProps={{
        style: { borderRadius: 0 },
        className:
          "!bg-[#fb7185] !text-black !border-2 !border-black !font-black !shadow-[2px_2px_0px_#000] hover:!bg-[#f43f5e] hover:!text-white !font-mono !uppercase !h-10 !px-4 !rounded-none cursor-pointer",
      }}
      cancelButtonProps={{
        style: { borderRadius: 0 },
        className:
          "!bg-white !text-black !border-2 !border-black !font-black !shadow-[2px_2px_0px_#000] hover:!bg-zinc-100 !font-mono !uppercase !h-10 !px-4 !rounded-none cursor-pointer",
        disabled: loading,
      }}
    >
      <div className="font-mono py-3 text-zinc-700 font-bold text-sm leading-relaxed">
        Are you sure you want to log out of your{" "}
        <span className="font-black text-black">Notebook</span> account? You will need to log back in to access your notes.
      </div>
    </Modal>
  );
}
