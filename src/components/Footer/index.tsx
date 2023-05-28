import React from "react";
import "./style.css";
import { useAppSelector } from "../../store/hooks";
import { BsTelegram, TbBrandVk } from "react-icons/all";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <div id="footer" className="footer">
      <div className="info">
        <div className={"map"}></div>
        <div className="contacs">
          <p>Контакты:</p>
          <p>Адрес: ул. Гоголя 63/1</p>
          <p>Телефон/WhatsApp: +7 (917) 400-63-00</p>
        </div>
        <div className="social">
          <p>Мы в соц. сетях:</p>
          <ul>
            <li>
              <div className={"vk-logo"}>
                <TbBrandVk />
              </div>
              <a href="https://vk.com/studio63_ufa" target="_blank">
                ВКонтакте
              </a>
            </li>
            <li>
              <BsTelegram />
              <a href="https://t.me/studio63_ufa" target="_blank">
                Телеграм
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
