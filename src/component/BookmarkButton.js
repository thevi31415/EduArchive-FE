import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookmarkButton = ({ documentId, userId, token, API_BASE_URL }) => {
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/BookmarkDocument?idDocument=${documentId}&idUser=${userId}`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsBookmark(data?.status);
        } else {
          console.error("Error checking follow status:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkFollowStatus();
  }, [documentId, userId, API_BASE_URL]);

  const handleFollowSubject = async () => {
    if (isBookmark) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/BookmarkDocument?idDocument=${documentId}&idUser=${userId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsBookmark(false);
          toast.success("Hủy lưu thành công!");
        } else if (response.status === 401 || response.status === 403) {
          toast.warning("Vui lòng đăng nhập!");
        } else {
          toast.error("Đã xảy ra lỗi");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/api/BookmarkDocument`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: 0,
            idDocument: documentId,
            idUser: userId,
            status: 0,
          }),
        });

        if (response.ok) {
          setIsBookmark(true);
          toast.success("Đã lưu thành công!");
        } else if (response.status === 401 || response.status === 403) {
          toast.warning("Vui lòng đăng nhập!");
        } else {
          toast.error("Đã xảy ra lỗi");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    }
  };

  return (
    <button
      className="font-bold py-2 px-3"
      style={{ fontSize: "26px" }}
      onClick={handleFollowSubject}
    >
      {isBookmark ? (
        <i className="fa-solid fa-bookmark"></i>
      ) : (
        <i className="fa-regular fa-bookmark"></i>
      )}
    </button>
  );
};

export default BookmarkButton;
