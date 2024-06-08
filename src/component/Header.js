import React, { useState } from "react";
const Header = () => {
  return (
    <div>
      <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
        <li style={{ marginRight: "10px" }}>
          <a href="/">Trang chủ</a>
        </li>
        <li style={{ marginRight: "10px" }}>
          <a href="/document">Tài liệu</a>
        </li>
        <li style={{ marginRight: "10px" }}>
          <a href="/exam">Đề thi</a>
        </li>
        <li style={{ marginRight: "10px" }}>
          <a href="/project">Đồ án</a>
        </li>
        <li>
          <a href="/subject">Môn học</a>
        </li>
      </ul>
    </div>
  );
};
export default Header;
