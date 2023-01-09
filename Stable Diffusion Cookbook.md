## Anon mega mix
base: Stable-Diffusion-v1-5


Models:
| Name                 | Link                                                        | Theme                  | base |
| -------------------- | ----------------------------------------------------------- | ---------------------- | ---- |
| Kuvshinov style      | https://civitai.com/models/1231/kuvshinov-style             | anime                  | A3   |
| Samdoesarts Ultmerge | https://civitai.com/models/68/samdoesarts-ultmerge          | digital art            |      |
| ~~F222~~                 | https://civitai.com/models/1188/f222                        | anatomy - female       |      |
| ~~Flexible-Diffusion~~   | https://huggingface.co/PublicPrompts/FlexibleDiffusion      | general purpose        |      |
| ~~Anything V3~~          | https://civitai.com/models/66/anything-v3                   | anime / base           |      |
| ~~Analog Diffusion~~     | https://civitai.com/models/1265/analog-diffusion            | analog /photorealistic |      |
| Inkpunk Diffuson     | https://huggingface.co/Envvi/Inkpunk-Diffusion              | digital art ink        |      |
| Synthwave            | https://huggingface.co/PublicPrompts/Synthwave              | neon synthwave         |      |
| ~~Redshift Diffusion~~   | https://civitai.com/models/64/redshift-diffusion            | CG / 3D                |      |
| ~~Openjourney~~          | https://civitai.com/models/86/openjourney-aka-midjourney-v4 | midjourney style       |      |
| RPGv3                | https://civitai.com/models/1116/rpg                         | rpg                    |      |
| Robo-Diffusion       | https://civitai.com/models/42/robo-diffusion                | robots                 |      |
| ~~Vintedois diffusion~~  | https://civitai.com/models/2781/vintedois-diffusion-v0-1    | general purpose        |      |
| H&A's 3D 1.1         | https://civitai.com/models/2504/handas-3dkx10b              | CG / 3D                |      |
| SDX+Berrymix         | https://civitai.com/models/1349/sxd-berrymix-merge          | anatomy                | A3   |
| ~~SeekArt.mega~~         | https://civitai.com/models/1315/seekart-mega                | general purpose        |      |

Steps:
| Step | Model A   | Model B            | Model C | Interpolation  | Multiplier | FP16 | Format      | File name |
| ---- | --------- | ------------------ | ------- | -------------- | ---------- | ---- | ----------- | --------- |
| 1    | Flex      | 22                 | sd-1.5  | Add difference | 0.35       | N    | Safetensors | AnonMix-1 |
| 2    | AnonMix-1 | Seek art           | sd-1.5  | Add difference | 0.35       | N    | Safetensors | AnonMix-2 |
| 3    | AnonMix-2 | A3                 |         | Weighted Sum   | 0.45       | N    | Safetensors | AnonMix-3 |
| 4    | AnonMix-3 | Analog diffusion   | sd-1.5  | Add difference | 0.25       | N    | Safetensors | AnonMix-4 |
| 5    | AnonMix-4 | Redshift diffusion | sd-1.5  | Add diference  | 0.15       | N    | Safetensors | AnonMix-5 |
| 6    | AnonMix-5 | Openjourney        | sd-1.5  | Add difference | 0.25       | N    | Safetensors | AnonMix-6 |
| 7    | AnonMix-6 | f222               | sd-1.5  | Add difference | 0.15       | N    | Safetensors | AnonMix-7 |
| 8    |           |                    |         |                |            |      |             |           |

**too much anime style in this**
