import React from "react";

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-400 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-green-400 md:text-4xl dark:text-white">
            Không tìm thấy trang này !
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Xin lỗi ! Trang web của chúng tôi không tìm thấy trang này. Vui lòng
            quay trở lại sau !
          </p>
          <a
            href="/"
            className="inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-green-900 my-4"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
