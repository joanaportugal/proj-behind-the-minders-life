import React, { useState } from "react";
import { connect } from "react-redux";

import StoryText from "../../../components/game/StoryText";
import { NextButton } from "../../../components/game/GameButtons";
import GameQuestion from "../../../components/game/GameQuestion";

import {
  updateTimeBoxAction,
  updateSkillsAction,
  updateBankBalanceAction
} from "../../../redux/game/actions";
import { updateAgeAction } from "../../../redux/formInfo/actions";

const ThirdMinderaJune = ({
  formAge,
  gameDetails,
  minderaThreeJun,
  increaseAge,
  updateBalance,
  updateSkills,
  updateBox,
  goToNext
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const onButtonClick = () => setIsOpen(!isOpen);

  const setOptions = (place, money) => {
    updateBalance(gameDetails.bankBalance - money);
    updateBox({
      ...gameDetails.timestamps,
      minderaThreeJun: {
        ...gameDetails.timestamps.minderaThreeJun,
        vacationPlace: place,
        vacationMoney: money
      }
    });
  };

  const updateSkillsLevel = esp => {
    switch (esp) {
      case "Frontend":
        updateSkills({
          ...gameDetails.skillsLevel,
          socialSkills: 100,
          frontend: {
            ...gameDetails.skillsLevel.frontend,
            angularSkills: 50,
            vueSkills: 50
          }
        });
        break;
      case "Backend":
        updateSkills({
          ...gameDetails.skillsLevel,
          socialSkills: 100,
          backend: {
            ...gameDetails.skillsLevel.backend,
            cplusplusSkills: 50,
            golangSkills: 50,
            phpSkills: 50,
            pythonSkills: 50,
            rubySkills: 50
          }
        });
        break;
      case "Mobile":
        updateSkills({
          ...gameDetails.skillsLevel,
          socialSkills: 100,
          mobile: {
            ...gameDetails.skillsLevel.mobile,
            dartSkills: 50,
            flutterSkills: 50,
            swiftSkills: 50,
            reactNativeSkills: 50
          }
        });
        break;
    }
  };

  return (
    <StoryText
      hashtag={`#june${gameDetails.startingYear + 4}`}
      isOpen={isOpen}
      onButtonClick={onButtonClick}
    >
      {!minderaThreeJun.vacationPlace && !minderaThreeJun.vacationMoney && (
        <>
          <p>
            My well-deserved vacations are coming and I'm wondering where I{" "}
            would like to go.
          </p>

          <GameQuestion
            question="Where would you like to go?"
            op1="Bahamas"
            op2="Fiji"
            op3="Dubai"
            op4="Los Angeles"
            onClickOp1={() => setOptions("Bahamas", 10000)}
            onClickOp2={() => setOptions("Fiji", 8000)}
            onClickOp3={() => setOptions("Dubai", 4500)}
            onClickOp4={() => setOptions("Los Angeles", 5000)}
          />
        </>
      )}

      {minderaThreeJun.vacationPlace && minderaThreeJun.vacationMoney && (
        <>
          <p>
            I spent {minderaThreeJun.vacationMoney} euros to my reservation to{" "}
            {minderaThreeJun.vacationPlace}.
          </p>
          {!minderaThreeJun.isFinished && (
            <NextButton
              action={() => {
                updateBalance(gameDetails.bankBalance + 600 * 3);
                increaseAge(formAge + 1);
                updateSkillsLevel(gameDetails.career);
                setIsOpen(false);
                goToNext(gameDetails.timestamps);
              }}
            />
          )}
        </>
      )}
    </StoryText>
  );
};

const mapStateToProps = state => {
  return {
    formAge: state.form.formDetails.age,
    gameDetails: state.game.gameInfo,
    minderaThreeJun: state.game.gameInfo.timestamps.minderaThreeJun
  };
};

const mapDispatchToProps = dispatch => ({
  increaseAge: age => dispatch(updateAgeAction(age)),
  updateBalance: bankBalance => dispatch(updateBankBalanceAction(bankBalance)),
  updateBox: timestamps => dispatch(updateTimeBoxAction(timestamps)),
  updateSkills: skillsLevel => dispatch(updateSkillsAction(skillsLevel)),
  goToNext: timestamps =>
    dispatch(
      updateTimeBoxAction({
        ...timestamps,
        minderaThreeJun: {
          ...timestamps.minderaThreeJun,
          isFinished: true
        }
      })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ThirdMinderaJune);
