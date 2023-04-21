import { Background, Content, Title } from "../../style/HostStyle";
import HeaderNav1 from "../header/HeaderNav1";

const HostEndPage = () => {
  return (
    <>
      <HeaderNav1 />
      <Background>
        <Title>
          Gajae.com에
          <br /> 숙소 <br />
          등록완료
          <Content>
            등록이 완료되었습니다. 심사후 정상적으로 반영됩니다.
          </Content>
        </Title>
      </Background>
    </>
  );
};

export default HostEndPage;
