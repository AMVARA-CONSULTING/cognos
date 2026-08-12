# Silent install — `response.properties`

**Captured:** 2026-08-12  
**Topic:** IBM Cognos Analytics silent / unattended install response file  
**Repo:** [amvara-CONSULTING/cognos](https://github.com/amvara-CONSULTING/cognos)

## Contents

| File | Role |
| --- | --- |
| [README.md](README.md) | This note |
| [response.properties.example](response.properties.example) | Sanitized custom-server template (edit before use) |
| [response-linux.properties.example](response-linux.properties.example) | Same pattern with Linux paths |

Do **not** commit real response files that contain encrypted passwords.

## Sources

- [PMsquare Cognos install/upgrade guide](https://pmsquare.com/resource/blogs/2023-6-13-the-ultimate-guide-to-cognos/)
- [CogKnowHow silent install notes](https://cogknowhow.tm1.dk/archives/1200)
- [John Daniel Associates — silent install scripts](https://www.johndaniel.com/cognos-analytics-silent-installation/)
- InstallAnywhere-style unattended packaging pattern (IBM)

---

## What the file is

`response.properties` is an InstallAnywhere **replay** file. It stores wizard answers for a silent run.

A working silent file needs:

- License accepted (`LICENSE_ACCEPTED=true`)
- Install directory
- Install type and features (Easy / Custom / Client)
- On modern kits: repository ZIP via `-DREPO=...` on the command line

---

## Method 1 — Generate the file (recommended)

Run the installer once with **`-r`** so InstallAnywhere records your choices.

### Windows (Cognos Analytics 11.2.x style)

```bat
ca_instl_win_*.exe -DREPO=ca_srv_win64_11.2.2.zip -r C:\install\media\response.properties
```

Older single-exe kits:

```bat
ca_server_win64_11.0.7.exe -r C:\install\media\response.properties
```

### Linux

```bash
./ca_instl_linuxx86_*.bin -DREPO=ca_srv_linuxi38664_*.zip -r /tmp/response.properties
```

### Steps

1. Start the installer with `-r` and the output path.
2. Walk the wizard (language, license, path, features, preserve options).
3. At the **pre-install summary**, cancel if you only need the file, or finish the install.
4. Confirm the file exists. Default name is often `installer.properties` in the working directory.
5. Edit paths and feature flags for other hosts.
6. Keep `LICENSE_ACCEPTED=true`. Silent install fails without it.

Passwords typed in the wizard are stored **encrypted** in the response file.

---

## Method 2 — Edit a template

Start from `*.example` in this folder or a recorded file. Keep **no spaces** around `=`.

### Typical custom server keys

| Property | Meaning |
| --- | --- |
| `BISRVR_FEATURE_DATATIER` | Content Manager / data tier |
| `BISRVR_FEATURE_APPTIER` | Application tier / dispatcher |
| `BISRVR_FEATURE_GATEWAY` | Optional gateway |
| `BISRVR_FEATURE_SAMPLES` | Samples |
| `BISRVR_INSTALLTYPE_CUSTOM` | Custom install (vs Easy) |
| `BISRVR_ALLUSERS` | Shortcuts for all users |

Values: `1` = selected, `0` = not. Use one response file per role in a distributed farm.

Recorded files also contain many `-fileOverwrite_...=Yes` lines. Keep them when you copy a generated file. Do not invent those paths by hand.

---

## Run the silent install

### Windows

```bat
ca_instl_win_*.exe -DREPO=ca_srv_win64_*.zip -f C:\install\media\response.properties -i silent
```

Older kits:

```bat
ca_server_win64_*.exe -i silent -f C:\install\media\response.properties
```

Use an elevated command prompt.

### Linux

```bash
./ca_instl_linuxx86_*.bin -DREPO=ca_srv_linuxi38664_*.zip -f /path/response.properties -i silent
```

### Check result

- Exit code **0** = success
- Logs: `<install_location>/logs`
- Version: `cmplst.txt`
- Silent install does **not** finish Cognos Configuration. Set content store and URIs with `cogconfig` / `cogstartup.xml`, then start services.

---

## Practical tips

1. Match `-DREPO` ZIP to the installer Fix Pack / release.
2. Keep installer and repository ZIP in the same folder when possible.
3. Windows antivirus that blocks `%TEMP%` executables can stop InstallAnywhere with no clear error.
4. For upgrades, set `USER_INSTALL_DIR` to the existing Cognos path.
5. After install, copy JDBC drivers into `<install>/drivers` if you automate further.
6. Never commit response files that contain encrypted secrets to this public repo.

---

## Related snippets in this repo

- [check_ulimit_requirements_cognos11.sh](../check_ulimit_requirements_cognos11.sh)
- [cleanUpCognosInstallation_unix](../cleanUpCognosInstallation_unix)
- [cognosAuditDbMaintenance](../cognosAuditDbMaintenance)
