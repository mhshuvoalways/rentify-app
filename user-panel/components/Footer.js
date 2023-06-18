import Image from "next/image";
import Facebook from "../public/social/facebook.svg";
import Instagram from "../public/social/instagram.svg";
import Twitter from "../public/social/twitter.svg";

const Footer = () => {
  return (
    <div className="bg-white py-16">
      <div className="w-10/12 mx-auto flex justify-center sm:justify-between gap-10 flex-wrap">
        <div className="w-full sm:w-3/12">
          <p className="font-bold text-xl">RentMe</p>
          <small className="mt-2">© All right reserverd MH Shuvo</small>
        </div>
        <div className="w-full sm:w-5/12">
          <p className="text-xl font-semibold">About us</p>
          <p className="mt-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui
            augue, interdum sed risus at, tristique rhoncus felis. Vestibulum
            malesuada lacus erat, ut fermentum tortor gravida ut. Morbi lacus
            erat, interdum et feugiat id, ultricies et nisl. Quisque ut nisi sed
            nulla molestie elementum. Curabitur porta risus velit, non placerat
            turpis efficitur ut. Mauris id risus urna. Curabitur finibus viverra
            lobortis. Curabitur non volutpat turpis. Mauris interdum eleifend
            metus sit amet sodales. Sed aliquam tempor ligula, in laoreet diam
            finibus eu. Morbi at lorem consectetur, molestie enim ut, mattis
            lacus. Morbi feugiat magna nec ante sodales, pretium rhoncus dui
            placerat.
          </p>
        </div>
        <div className="w-full sm:w-3/12">
          <p className="text-xl font-semibold">Contact us</p>
          <div className="mt-2">
            <p>example@gmail.com</p>
            <p>+123456789</p>
          </div>
          <div className="flex gap-5 mt-5">
            <Image
              src={Facebook}
              alt={Facebook}
              width={20}
              className="cursor-pointer"
            />
            <Image
              src={Instagram}
              alt={Instagram}
              width={20}
              className="cursor-pointer"
            />
            <Image
              src={Twitter}
              alt={Twitter}
              width={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
