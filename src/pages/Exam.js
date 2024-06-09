function Exam() {
  return (
    <>
      <nav
        className="flex rounded-lg bg-green-100 p-4 w-full"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-4 text-green-500">
          <li>
            <a href="#" className="hover:underline">
              Trang chủ
            </a>
          </li>
          <li>
            <span>/</span>
          </li>

          <li>
            <span className="font-bold">Tài liệu</span>
          </li>
        </ol>
      </nav>
      <section className="bg-white py-[20px] dark:bg-dark ml-5">
        <div className="mx-auto px-4 sm:container">
          <div
            className="border-l-[5px] border-primary pl-5"
            style={{ color: "#22C55D" }}
          >
            <h2
              className="mb-2 text-3xl font-semibold text-dark dark:text-white"
              style={{ color: "#22C55D" }}
            >
              Tài liệu
            </h2>
          </div>
        </div>
      </section>
      <div style={{ margin: 20, marginLeft: 60, marginRight: 60 }}>Đề thi</div>
    </>
  );
}
export default Exam;
