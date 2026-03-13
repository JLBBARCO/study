import subprocess
import sys
from pathlib import Path


def main() -> None:
	# Resolve o requirements.txt na raiz do repositório, independentemente do cwd.
	requirements_file = Path(__file__).resolve().parents[2] / "requirements.txt"

	if not requirements_file.exists():
		raise FileNotFoundError(f"Could not find requirements file: {requirements_file}")

	subprocess.check_call(
		[sys.executable, "-m", "pip", "install", "-r", str(requirements_file)]
	)


if __name__ == "__main__":
	main()