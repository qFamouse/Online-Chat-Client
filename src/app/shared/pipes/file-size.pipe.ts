import { Pipe, PipeTransform } from "@angular/core";

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * @returns {string} Formatted string.
 *
 * @author mpen
 * @link https://stackoverflow.com/a/14919494/14851803
 */
@Pipe({
	name: "fileSize"
})
export class FileSizePipe implements PipeTransform {
	transform(bytes: number, si = false, dp = 1): string {
		const thresh = si ? 1000 : 1024;

		if (Math.abs(bytes) < thresh) {
			return bytes + " B";
		}

		const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		// const units = si	? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
		let u = -1;
		const r = 10 ** dp;

		do {
			bytes /= thresh;
			++u;
		} while (
			Math.round(Math.abs(bytes) * r) / r >= thresh &&
			u < units.length - 1
		);

		return bytes.toFixed(dp) + " " + units[u];
	}
}
