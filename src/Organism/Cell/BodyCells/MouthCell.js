import CellStates from '../CellStates';
import BodyCell from './BodyCell';
import Hyperparams from '../../../Hyperparameters';

class MouthCell extends BodyCell {
    constructor(org, loc_col, loc_row) {
        super(CellStates.mouth, org, loc_col, loc_row);
    }

    performFunction() {
        var env = this.org.env;
        var real_c = this.getRealCol();
        var real_r = this.getRealRow();
        for (var loc of Hyperparams.edibleNeighbors) {
            var cell = env.grid_map.cellAt(real_c + loc[0], real_r + loc[1]);
            this.eatNeighbor(cell, env);
        }
    }

    eatNeighbor(n_cell, env) {
        if (n_cell == null) return;
        if (n_cell.state == CellStates.food) {
            env.changeCell(n_cell.col, n_cell.row, CellStates.empty, null);
            this.org.food_collected++;
        }
    }
}

export default MouthCell;
