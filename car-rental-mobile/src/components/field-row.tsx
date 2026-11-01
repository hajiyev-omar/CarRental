import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Props = {
  label: string;
  gap: number;
  children: ReactNode;
};

export function FieldRow({ label, gap, children }: Props) {
  return (
    <View style={[styles.row, { marginTop: gap }]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

export const fieldInputStyle = {
  flex: 1,
  height: 20,
  padding: 0,
  paddingRight: 2,
  textAlign: 'right',
  fontFamily: Fonts.sans,
  fontSize: 13,
  color: Colors.gray,
} as const;

const styles = StyleSheet.create({
  row: {
    height: 26,
    marginLeft: 24,
    marginRight: 15,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#BECEDA',
  },
  label: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.gray,
  },
});
