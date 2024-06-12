function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        <a href="/">
          <div className="inline-flex gap-1.5 text-lg">
            <span
              className="font-medium "
              style={{
                fontSize: "30px",
                color: "#48DA7D",
                fontWeight: "bold",
              }}
            >
              EduArchive
            </span>
            <span aria-hidden="true" role="img">
              ✨
            </span>
          </div>
        </a>
        <div className="mt-6">
          <p className="max-w-md text-pretty leading-relaxed text-gray-700">
            Trang chia sẻ tài liệu, đồ án và đề thi mà tôi đã sưu tầm được trong
            quá trình học của mình. Hy vọng nó sẽ giúp ích được cho các bạn !
          </p>
          <div className="mt-4 lg:flex lg:items-end lg:justify-between">
            <ul className="flex gap-4">
              <li>
                <a
                  className="block text-sm font-medium text-gray-900 hover:opacity-75"
                  href="/about/faqs"
                  style={{
                    color: "#48DA7D",
                  }}
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  className="block text-sm font-medium text-gray-900 hover:opacity-75"
                  href="/about/acknowledgements"
                  style={{
                    color: "#48DA7D",
                  }}
                >
                  Acknowledgements
                </a>
              </li>
            </ul>
            <p className="mt-4  text-gray-700 lg:mt-0">
              Created by{" "}
              <a
                href="https://github.com/thevi31415/"
                rel="noreferrer"
                target="_blank"
                style={{
                  color: "#48DA7D",
                }}
                className="inline-block font-medium hover:text-gray-900"
              >
                Nguyen Duong The Vi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
