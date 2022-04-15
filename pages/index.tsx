import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import {
  GoogleIcon,
  LogoIcon,
  LogoIconLight,
  MoonIcon,
  SunIconBright,
  SunIconDark,
} from "../components/icons/images";
import { useRouter } from "next/router";

export default function Login({ providers }: any) {
  const [checked, setChecked] = useState<boolean>(false);
  const [pageTheme, setPageTheme] = useState<string>("light");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  return (
    <div className={`${checked ? "dark" : ""}`}>
      <div className="w-full h-screen flex items-center px-4 dark:bg-gray-800  ">
        <div className="px-[38px] py-[50px] w-full md:w-[380px] h-[400px] mx-auto rounded-3xl dark:bg-gray-800 bg-white border border-[#BDBDBD] ">
          <div className="w-fit  flex justify-center items-center mb-7 space-x-2">
            {checked ? <LogoIconLight /> : <LogoIcon />}
            <p className="text-lg font-bold dark:text-white text-[#282051]">
              Jam-Stack-Chat
            </p>
          </div>
          <div className="w-[300px]  mb-[35px] dark:text-white">
            <p className="font text-lg font-medium leading-[25px] ">
              Join thousands of Develpers from around the world!
            </p>
          </div>
          {Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "http://localhost:3000/user-profile",
                })
              }
              className="flex justify-center items-center border-2 rounded-3xl px-4 py-1 hover:border-green-200 shadow-xl mx-auto "
            >
              <GoogleIcon />
              <p className="dark:text-white font-medium text-lg">
                Sign in with {provider.name}
              </p>
            </button>
          ))}

          <div className="w-full my-4">
            <span className="flex w-24 justify-between mx-auto">
              {checked ? <SunIconBright /> : <SunIconDark />}
              <div className=" mx-auto">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  name="checkbox"
                  id="checkbox"
                  className="hidden"
                />
                <label htmlFor="checkbox" className="cursor-pointer">
                  <div
                    className={
                      `${checked ? "bg-gray-600" : "bg-gray-800"} ` +
                      "w-9 h-5 flex items-center rounded-full transition-colors ease-in-out duration-200 "
                    }
                  >
                    <div
                      className={
                        `${
                          checked
                            ? "bg-white translate-x-5 duration-200 "
                            : "translate-x-0 duration-200"
                        } ` + "w-4 h-4 bg-white rounded-full shadow"
                      }
                    ></div>
                  </div>
                </label>
              </div>
              <MoonIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

// http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2FuserProfile&error=OAuthCallback
