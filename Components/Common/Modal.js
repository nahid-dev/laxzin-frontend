import React from "react";

import { Modal } from "antd";

const CommonModal = ({setOpenResponsive, openResponsive, children}) => {
  return (
    <div>
      <Modal
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CommonModal;
