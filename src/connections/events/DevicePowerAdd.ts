import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDevicePowerAddData } from '../../api/DevicePower';

export default function devicePowerAdd(data: SSEDevicePowerAddData, hue: Hue) {
	const devicePower = hue.devicePowers._add(data);

	return () => hue.emit(Events.DevicePowerAdd, devicePower);
}
