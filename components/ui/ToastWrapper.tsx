import { ColorSchemeName, Text, View } from "react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";

const ToastWrapper = ({ scheme }: { scheme: ColorSchemeName }) => {
  const lightColors = {
    successBg: '#4BB543',
    errorBg: '#D32F2F',
    infoBg: '#2196F3',
    text: '#FFFFFF',
  };

  const darkColors = {
    successBg: '#388E3C',
    errorBg: '#F44336',
    infoBg: '#1976D2',
    text: '#FFFFFF',
  };

  const colors = scheme === 'dark' ? darkColors : lightColors;

  const ToastView = ({ bgColor, text }: { bgColor: string; text: string }) => (
    <View style={{ padding: 15, backgroundColor: bgColor, borderRadius: 10, marginHorizontal: 10 }}>
      <Text style={{ color: colors.text, fontWeight: '600' }}>{text}</Text>
    </View>
  );

  return (
    <Toast
      config={{
        success: (props: BaseToastProps) => (
          <ToastView bgColor={colors.successBg} text={props.text1 || 'Success'} />
        ),
        error: (props: BaseToastProps) => (
          <ToastView bgColor={colors.errorBg} text={props.text1 || 'Error'} />
        ),
        info: (props: BaseToastProps) => (
          <ToastView bgColor={colors.infoBg} text={props.text1 || 'Info'} />
        ),
      }}
    />
  );
};

export default ToastWrapper;
