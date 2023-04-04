import styled from "styled-components";

type FlexProps = {
  w?: number;
  h?: number;
  p?: number | Array<number>;
  m?: number | Array<number>;
  gap?: number | Array<number>;
  justify?: string;
  align?: string;
  flex?: number;
  color?: string;
};

export const Flex = styled.div<FlexProps>`
  display: flex;

  width: ${(props) => (props.w ? `${props.w}px` : "max-content")};

  height: ${(props) => (props.h ? `${props.h}px` : "max-content")};

  padding: ${(props) => {
    if (typeof props.p === "number") {
      return `${props.p}px`;
    }
    if (typeof props.p === "object") {
      return props.p.join("px ") + "px";
    }
    return "";
  }};

  margin: ${(props) => {
    if (typeof props.m === "number") {
      return `${props.m}px`;
    }
    if (typeof props.m === "object") {
      return props.m.join("px ") + "px";
    }
    return "";
  }};

  gap: ${(props) => {
    if (typeof props.gap === "number") {
      return `${props.p}px`;
    }
    if (typeof props.gap === "object") {
      return props.gap.join("px ") + "px";
    }
    return "";
  }};

  align-items: ${(props) => (props.align ? props.align : "center")};

  justify-content: ${(props) => (props.justify ? props.justify : "start")};
  ${(props) => (props.flex ? "flex:" + props.flex : null)};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  max-width: inherit;
  max-height: inherit;
  object-fit: contain;
`;

export const CustomControl = styled(Flex)<FlexProps>`
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: -70px;
  left: 0;
  background-color: #00000050;
  box-sizing: border-box;
  svg {
    width: 20px;
    height: 20px;
    transition: scale 200ms ease;
    &:hover {
      scale: 1.05;
    }
  }
  transition: bottom 200ms ease-in-out;
`;

export const VideoContainer = styled.div`
  &[data-show="true"] {
    display: block;
  }
  display: none;
  box-sizing: content-box;
  position: relative;
  width: max-content;
  height: max-content;
  max-width: 100%;
  max-height: 500px;
  margin: 0 auto;
  overflow:hidden;
  &:hover ${CustomControl} {
    bottom:0;
  }
`;

export const ExtraDisplays = styled(Flex)<FlexProps>`
  width: 100%;
  height: calc(100% - 70px);
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  font-size: 24px;
`;
