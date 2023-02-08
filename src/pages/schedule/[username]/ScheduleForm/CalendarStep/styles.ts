import { Box, styled, Text } from "@ignite-ui/react";

export const Container = styled(Box, {
  margin: "$6 auto 0",
  padding: 0,
  display: "grid",
  position: "relative",

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: "1fr 280px",

        "@media(max-width: 900px)": {
          gridTemplateColumns: "1fr"
        }
      },
      false: {
        width: 540,
        gridTemplateColumns: "1fr"
      }
    }
  }
});

export const TimePicker = styled("div", {
  borderLeft: "1px solid $gray600",
  padding: "$6 $6 0",
  overflowY: "scroll",

  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  width: 280
});

export const TimePickerHeader = styled(Text, {
  fontWeight: "$medium",

  span: {
    color: "$gray200"
  }
});

export const TimePickerList = styled("div", {
  marginTop: "$3",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$2",

  "@media(max-width: 900px)": {
    gridTemplateColumns: "2fr"
  }
});

export const TimePickerItem = styled("button", {
  border: 0,
  backgroundColor: "$gray600",
  borderRadius: "$sm",
  padding: "$2 0",
  cursor: "pointer",
  color: "$gray100",
  fontSize: "$sm",
  lineHeight: "$base",

  "&:last-child": {
    marginBottom: "$6"
  },

  "&:disabled": {
    background: "none",
    cursor: "not-allowed",
    opacity: 0.4
  },

  "&:focus": {
    boxShadow: "0 0 0 1.5 $colors$gray500"
  }
});
